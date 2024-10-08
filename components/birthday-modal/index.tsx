"use client";
import React, { useCallback } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "../modal";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { useStore } from "@/hooks/useStore";
import { toast } from "@/hooks/use-toast";
import { updateBirthDay } from "@/app/actions/birthday.action";

const BirthDayModal = () => {
  const queryClient = useQueryClient();
  const { isBirthDayModalOpen, onCloseBirthDayModal } = useStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const formSchema = z.object({
    dateOfBirth: z
      .string()
      .min(1, { message: "Date of birth is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Please enter a valid date",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: "",
    },
  });
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setIsLoading(true);
        const response = await updateBirthDay(values.dateOfBirth);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
          exact: true,
        });
        toast({
          title: "Success",
          description: response?.message || "Updated birth day",
        });
        onCloseBirthDayModal();
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to update birthday",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [queryClient, onCloseBirthDayModal, form]
  );

  return (
    <Modal
      title="What's your birth date?"
      isOpen={isBirthDayModalOpen}
      //onClose={onCloseBirthDayModal}
      body={
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-[200px] w-full flex-col
             items-start justify-between space-y-2"
          >
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Dob"
                      type="date"
                      disabled={false}
                      className="form--input focus:boder-0
                   dark:border-[rgba(255,255,255,.5)]
                          "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="brandPrimary"
              width="full"
              type="submit"
              size="brandsm"
              className="!mt-5 gap-1"
              disabled={isLoading || !form?.getValues().dateOfBirth}
            >
              {isLoading && <Spinner size="default" />}
              Save
            </Button>
          </form>
        </FormProvider>
      }
    />
  );
};

export default BirthDayModal;
