"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Minimal shape of the (non-standard, vendor-prefixed on Chromium) Web
// Speech API — no @types package is installed for it, so it's typed just
// enough to use safely. Feature-detected at call time; every browser
// without it simply never sees the mic button do anything.
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Feature support never changes after load, so there's nothing to
// subscribe to — this is just useSyncExternalStore's hydration-safe way
// to read a browser-only value (false on the server, the real check on
// the client) without a setState-in-effect render flash.
function noopSubscribe() {
  return () => {};
}
function getSupportedSnapshot() {
  return getSpeechRecognitionCtor() !== null;
}
function getServerSupportedSnapshot() {
  return false;
}

/** Best-effort voice dictation: appends recognized speech to the caller's text. Silently unsupported outside Chromium. */
export function useSpeechToText(onTranscript: (text: string) => void) {
  const supported = useSyncExternalStore(noopSubscribe, getSupportedSnapshot, getServerSupportedSnapshot);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const toggle = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;
    try {
      const recognition = new Ctor();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i]?.[0]?.transcript;
          if (transcript) onTranscript(transcript.trim());
        }
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  useEffect(() => () => recognitionRef.current?.stop(), []);

  return { supported, listening, toggle };
}
