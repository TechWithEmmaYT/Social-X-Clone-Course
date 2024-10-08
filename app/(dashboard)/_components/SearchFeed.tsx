"use client";
import React from "react";
import useSearch from "@/hooks/useSearch";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/spinner";
import PostItem from "./_common/PostItem";
import Link from "next/link";
import FollowButton from "./_common/FollowButton";
import { PLAN_TYPE } from "@/constants/pricing-plans";
import Badge from "@/components/badge";

const SearchFeed = () => {
  const router = useRouter();
  const param = useSearchParams();
  const query = param.get("q") ?? "";
  const filter = param.get("f") ?? "";

  const { data, isLoading } = useSearch({
    query,
    filter,
  });

  const posts = data?.posts || [];
  const users: UserType[] = data?.users || ([] as UserType[]);

  const handleQuery = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handlePeopleQuery = () => {
    router.push(`/search?q=${encodeURIComponent(query)}&f=user`);
  };

  return (
    <Tabs defaultValue={filter ? "people" : "posts"} className="w-full">
      <TabsList
        className="flex items-center justify-start
      gap-14 w-full px-5 h-auto pb-2 !bg-transparent
      border-b-[1px] dark:border-[rgb(47,51,54)]
      "
      >
        <TabsTrigger
          value="posts"
          className="!text-base active:font-bold"
          onClick={handleQuery}
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="people"
          className="!text-base active:font-bold"
          onClick={handlePeopleQuery}
        >
          People
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="w-full flex flex-col items-center justify-center">
          {isLoading ? (
            <Spinner size="icon" />
          ) : posts?.length === 0 ? (
            <div className=" w-full p-6">
              <p
                className="text-xl text-center 
               dark:text-white/80"
              >
                No post found
              </p>
            </div>
          ) : (
            <>
              {posts?.map((post: PostType) => (
                <PostItem key={post.id} post={post} />
              ))}
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="people" className=" w-full px-5">
        <div className="w-full flex flex-col items-center justify-center">
          {isLoading ? (
            <Spinner size="icon" />
          ) : users?.length === 0 ? (
            <div className=" w-full p-6">
              <p
                className="text-xl text-center
             dark:text-white/80"
              >
                No user found
              </p>
            </div>
          ) : (
            <ul role="list" className=" w-full flex flex-col gap-6 mt-4 pb-2">
              {users?.map((user) => (
                <li
                  key={user?.id}
                  role="listitem"
                  className="flex flex-row gap-4 cursor-pointer"
                >
                  <Link href={`/${user?.username}`} className="shrink-0 w-fit">
                    <Avatar className="cursor-pointer hover:opacity-90">
                      <AvatarImage
                        src={user?.profileImage || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="font-bold text-[18px]">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <div
                      className="flex flex-1 items-center 
                    justify-between"
                    >
                      <div className="flex flex-col">
                        <Link
                          href={`/${user?.username}`}
                          className="hover:underline"
                        >
                          <div className="flex gap1">
                            <h5 className="font-semibold text-[15.5px] transition">
                              {user?.name}
                            </h5>
                            {user?.subscription?.plan === PLAN_TYPE.PRO && (
                              <Badge />
                            )}
                          </div>
                        </Link>
                        <div className="w-full block">
                          <Link href={`/${user?.username}`}>
                            <p
                              className="!text-[#959fa8] text-sm block 
                    truncate font-medium"
                            >
                              @{user.username}
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="shrink">
                        <FollowButton
                          userId={user?.id}
                          username={user?.username as string}
                        />
                      </div>
                    </div>
                    <div className="pt-3">
                      <p
                        className="text-[15px] 
                      font-normal"
                      >
                        {user?.bio}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SearchFeed;
