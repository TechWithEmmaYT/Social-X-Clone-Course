"use client";
import React, { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";
import Image from "next/image";
import { PLAN_TYPE } from "@/constants/pricing-plans";
import Badge from "@/components/badge";

interface PropsType {
  comment: CommentType;
}

const CommentItem: React.FC<PropsType> = ({ comment }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      router.push(`/${comment?.user?.username}`);
    },
    [router, comment?.user?.username]
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) return null;

    const timeDifference = formatDistanceToNowStrict(
      new Date(comment.createdAt)
    );
    const timeParts = timeDifference.split(" ");
    let formattedTime;

    if (timeParts[1]?.startsWith("second")) {
      formattedTime = `${timeParts[0]}s`;
    } else if (timeParts[1]?.startsWith("minute")) {
      formattedTime = `${timeParts[0]}min`;
    } else if (timeParts[1]?.startsWith("hour")) {
      formattedTime = `${timeParts[0]}h`;
    } else if (timeParts[1]?.startsWith("day")) {
      formattedTime = `${timeParts[0]}d`;
    } else {
      formattedTime = timeDifference;
    }

    return formattedTime;
  }, [comment?.createdAt]);

  return (
    <div
      className="
          w-full h-auto border-b-[1px]
          dark:border-[rgb(47,51,54)]
          p-5 transition
          "
    >
      <div
        className="flex flex-row 
          items-start gap-3"
      >
        <Avatar role="button" onClick={goToUser}>
          <AvatarImage
            src={comment?.user?.profileImage || ""}
            alt={comment?.user.username || ""}
            className="object-cover"
          />
          <AvatarFallback className="font-bold">
            {comment?.user?.name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="flex items-center gap-[4px]">
            <div className="flex flex-row gap-[2px]">
              <h5
                className="
              font-bold cursor-pointer
              hover:underline
              "
                role="button"
                onClick={goToUser}
              >
                {comment?.user?.name}
              </h5>
              {comment?.user?.subscription?.plan === PLAN_TYPE.PRO && <Badge />}
            </div>
            <span
              className="!text-[#959fa8] 
              text-sm inline-block truncate 
              font-normal"
              role="button"
              onClick={goToUser}
            >
              @{comment?.user?.username}
            </span>
            <div className="flex items-center">
              <span
                className="!text-[#959fa8]
               text-sm"
              >
                <Dot size="15px" />
              </span>
              <span
                className="!text-[#959fa8] 
              text-sm"
              >
                {createdAt}
              </span>
            </div>
          </div>

          <div className="mt-1">
            <div dangerouslySetInnerHTML={{ __html: comment.body }} />
          </div>
          {comment?.commentImage && (
            <div
              className="relative w-full
             my-3 h-80 overflow-hidden rounded-md
             bg-[#eee] dark:bg-gray-600"
            >
              <Image
                src={comment?.commentImage}
                alt={comment?.user?.username || "Image"}
                fill
                loading="lazy"
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
