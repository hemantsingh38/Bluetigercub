"use client";

import { useRef } from "react";
import clsx from "clsx";
import { MicIcon, PaperclipIcon, PlusIcon, XIcon } from "@/components/kotg/icons";
import { useSpeechToText } from "@/components/kotg/fields/use-speech-to-text";

type QuickTag = { label: string; template: string };

export function TaggedTextarea({
  value,
  onChange,
  placeholder,
  quickTags,
  maxLength,
  numbered = false,
  attachments,
  onAttachmentsChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  quickTags?: QuickTag[];
  maxLength?: number;
  numbered?: boolean;
  attachments?: string[];
  onAttachmentsChange?: (files: string[]) => void;
  rows?: number;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { supported: micSupported, listening, toggle: toggleMic } = useSpeechToText((transcript) => {
    appendLine(transcript);
  });

  function appendLine(text: string) {
    const lineCount = value ? value.split("\n").filter(Boolean).length : 0;
    const prefix = numbered ? `${lineCount + 1}. ` : "";
    const next = value ? `${value}\n${prefix}${text}` : `${prefix}${text}`;
    onChange(maxLength ? next.slice(0, maxLength) : next);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded border border-kotg-border bg-white focus-within:border-kotg-primary">
        <textarea
          value={value}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none bg-transparent px-3.5 pt-3 text-sm text-kotg-black outline-none placeholder:text-kotg-text-muted"
        />
        <div className="flex items-center justify-between px-3.5 pb-2.5 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach a file"
              className="text-kotg-text-muted hover:text-kotg-primary"
            >
              <PaperclipIcon />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const names = Array.from(e.target.files ?? []).map((f) => f.name);
                if (names.length && onAttachmentsChange) onAttachmentsChange([...(attachments ?? []), ...names]);
                e.target.value = "";
              }}
            />
            {quickTags?.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => appendLine(tag.template)}
                className="flex items-center gap-1 rounded-full border border-kotg-border px-3 py-1 text-xs font-medium text-kotg-black hover:border-kotg-primary hover:text-kotg-primary"
              >
                <PlusIcon size={11} />
                {tag.label}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 pl-2">
            {maxLength && (
              <span className="text-xs text-kotg-text-muted">
                {value.length}/{maxLength}
              </span>
            )}
            <button
              type="button"
              onClick={toggleMic}
              aria-label="Dictate"
              title={micSupported ? "Dictate" : "Voice input not supported in this browser"}
              className={clsx("text-kotg-text-muted hover:text-kotg-primary", listening && "animate-pulse text-kotg-red")}
            >
              <MicIcon />
            </button>
          </div>
        </div>
      </div>

      {!!attachments?.length && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-1.5 rounded-full bg-kotg-fill px-3 py-1 text-xs text-kotg-black">
              {name}
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() => onAttachmentsChange?.(attachments.filter((_, idx) => idx !== i))}
                className="text-kotg-text-muted hover:text-kotg-red"
              >
                <XIcon size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
