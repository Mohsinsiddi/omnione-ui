"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { previewed, resetProjectData } from "@redux/features/portProjectData";
import { reset } from "@redux/features/porting";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  image: z.string().min(10, {
    message: "image must be at least 10 characters.",
  }),
  symbol: z.string().min(1, {
    message: "symbol must be at least 1 character.",
  }),
  owner: z.string().min(20, {
    message: "onwer address must be at least 20 characters.",
  }),

  collectionAddress: z.string().min(20, {
    message: "collection address must be at least 20 characters.",
  }),
  supply: z.string().min(0, {
    message: "supply must be at least 1 characters.",
  }),
});

interface SourceChainFromProps {}

const SourceChainFrom: React.FC<SourceChainFromProps> = () => {
  const dispatch = useAppDispatch();
  const projectData = useAppSelector(
    (state) => state.projectDataReducer.ProjectData
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: projectData.name,
      image: projectData.image,
      owner: projectData.ownerAddress,
      collectionAddress: projectData.collectionAddress,
      supply: projectData.collectionSupply,
      symbol: projectData.symbol,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    dispatch(previewed());
    //dispatch(resetProjectData());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Degods" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="DGOD" {...field} />
              </FormControl>
              <FormDescription>This is your collection symbol.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Address</FormLabel>
              <FormControl>
                <Input placeholder="0x802D8....1adde57" {...field} />
              </FormControl>
              <FormDescription>Update the project banner</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Address</FormLabel>
              <FormControl>
                <Input placeholder="0x802D8....1adde57" {...field} />
              </FormControl>
              <FormDescription>Update the project banner</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Supply</FormLabel>
              <FormControl>
                <Input placeholder="10000" {...field} />
              </FormControl>
              <FormDescription>Supply of Collection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center gap-x-1">
          {" "}
          <Button type="submit">Confirm and Preview for Migration</Button>
          <Button
            type="reset"
            onClick={() => {
              dispatch(resetProjectData());
              dispatch(reset());
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SourceChainFrom;
