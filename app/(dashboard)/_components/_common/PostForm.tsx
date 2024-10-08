"use client";
import React, { useCallback } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { useCurrentUserContext } from "@/context/currentuser-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import useUploadcare from "@/hooks/useUploadcare";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DraftEditor from "@/components/draft-editor";
import { EditorState } from "draft-js";
import UploadButton from "@/components/upload-button";
import axios from "axios";
import { BASE_URL } from "@/lib/base-url";
import { toast } from "@/hooks/use-toast";
import { addComment } from "@/app/actions/comment.action";

interface PropsType {
  placeholder: string;
  isComment?: boolean;
  postUsername?: string;
  postId?: number;
}

const PostForm: React.FC<PropsType> = ({
  placeholder,
  isComment,
  postId,
  postUsername,
}) => {
  const { base64, uploadFile, uploadedUrl, uploading, clearFile } =
    useUploadcare();
  const { data, isLoading } = useCurrentUserContext();
  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState(false);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const currentUser = data?.currentUser ?? ({} as UserType);

  const formSchema = z.object({
    body: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        if (isComment && postId) {
          await addComment({
            body: values.body,
            postId: postId,
            commentImage: uploadedUrl || "",
          });
          toast({
            title: "Success",
            description: "Comment created successfully",
            variant: "default",
          });
          queryClient.invalidateQueries({
            queryKey: ["post", postId],
          });
        } else {
          await axios.post(`${BASE_URL}/api/posts`, {
            body: values.body,
            postImage: uploadedUrl || "",
          });
          toast({
            title: "Success",
            description: "Post created successfully",
            variant: "default",
          });
          queryClient.invalidateQueries({
            queryKey: ["posts", "allposts"],
          });
        }
        setEditorState(EditorState.createEmpty());
        form.reset();
        clearFile();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create post or comment",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [clearFile, isComment, postId, queryClient, uploadedUrl]
  );

  const handleUploadFile = useCallback(
    async (file: File) => {
      if (!file) return;
      await uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div
      className="border-b-[1px]
  dark:border-[rgb(47,51,54)]
  py-2
    "
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full 
          flex-col items-center justify-center px-3"
        >
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <div className="w-full px-4 flex pb-11 gap-4">
              <div className="shrink-0">
                <Avatar>
                  <AvatarImage
                    src={currentUser?.profileImage || ""}
                    alt={currentUser?.username || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="font-bold">
                    {currentUser?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {isComment && (
                  <div className="flex items-center">
                    <p className="!text-[#959fa8] text-sm font-normal">
                      Replying to{" "}
                      <Link className="!text-primary" href={`/${postUsername}`}>
                        @{postUsername}
                      </Link>
                    </p>
                  </div>
                )}

                <div
                  className="min-h-6 !max-h-80 
                                  overflow-auto overflow-x-hidden mb-3"
                >
                  <DraftEditor
                    placeholder={placeholder}
                    wrapperClassName="!min-h-6 !max-h-80 
                    !border-none w-full"
                    editorClassName="placeholder:text-muted-foreground 
                    outline-0 px-0 
                    focus-visible:outline-none 
                    text-[18px] resize-none 
                    !py-0 w-full 
                    focus:border-0 !border-none "
                    editorState={editorState}
                    setEditorState={setEditorState}
                    onChange={(html) => {
                      form.setValue("body", html);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  {base64 && (
                    <div
                      className="w-14 h-14 relative 
                    rounded-md border overflow-hidden"
                    >
                      <Image
                        src={base64 || ""}
                        width={44}
                        height={44}
                        alt=""
                        className="w-full h-full 
                        rounded-md object-cover"
                      />
                      {uploading && (
                        <div
                          className="absolute inset-0 
                        w-full h-full bg-gray-950/10 dark:bg-gray-950/30
                        flex items-center justify-center"
                        >
                          <Spinner size="lg" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <hr
                  className="px-3  h-[0.5px] w-full opacity-0
               dark:border-[rgb(34,37,40)] mb-1 transition
              "
                />
                <div
                  className="w-full flex items-center
                                   justify-between"
                >
                  <div className="flex items-center flex-1">
                    <UploadButton
                      disabled={uploading}
                      onFileSelect={handleUploadFile}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="brandPrimary"
                    size="brandsm"
                    disabled={loading || uploading || !form?.getValues()?.body}
                    className="
                        !h-auto
                        !text-white
                        cursor-pointer
                        font-semibold
                        text-base"
                  >
                    {loading ? (
                      <Spinner size="default" />
                    ) : isComment ? (
                      "Reply"
                    ) : (
                      "Post"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default PostForm;
