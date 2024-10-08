"use client";
import React, { useCallback } from "react";
import { convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";

import { cn } from "@/lib/utils";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface PropsType {
  placeholder: string;
  wrapperClassName?: string;
  editorClassName?: string;
  onChange: (html: string) => void;
  editorState?: any; // Receive the editor state
  setEditorState?: (state: any) => void;
}

const DraftEditor: React.FC<PropsType> = ({
  placeholder,
  editorClassName,
  wrapperClassName,
  onChange,
  editorState,
  setEditorState,
}) => {
  const onEditorStateChange = useCallback((state: any) => {
    setEditorState?.(state);
    const contentState = state.getCurrentContent();
    const convertRaw = convertToRaw(contentState);
    const html = draftToHtml(convertRaw);
    onChange?.(html);
  }, []);
  return (
    <Editor
      toolbarHidden
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      placeholder={placeholder}
      wrapperClassName={cn(
        "wrapper-class border border-input",
        wrapperClassName
      )}
      editorClassName={cn("editor-class", editorClassName)}
    />
  );
};

export default DraftEditor;
