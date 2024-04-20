"use client";

import { useState } from "react";
// PLUGINS
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { BeatLoader } from "react-spinners";
// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// COMPONENTS
import { Modal, Form, Input, Button } from "@/components/ui";
import { OverlayScrollbars } from "@/components";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
}

const formSchema = z.object({
  author: z.string().min(1, { message: "Field is required" }),
  title: z.string().min(1, { message: "Field is required" }),
  song: z.custom<File>((v) => v instanceof File, { message: "Image is required" }),
  image: z.custom<File>((v) => v instanceof File, { message: "Song is required" }),
});

type UploadFormValues = z.infer<typeof formSchema>;

export default function UploadModal({ open, title, description, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const router = useRouter();

  const form = useForm<UploadFormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      song: undefined,
      image: undefined,
    },
  });

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      onClose?.();
    }
  };

  const onSubmit: SubmitHandler<UploadFormValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values?.image;
      const songFile = values?.song;
      const user = session?.user;

      if (!imageFile || !songFile || !user) {
        return enqueueSnackbar("Missing fields", { variant: "error" });
      }

      const uniqueID = window.crypto.randomUUID();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return enqueueSnackbar("Failed song upload", { variant: "error" });
      }

      // Upload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return enqueueSnackbar("Failed image upload", { variant: "error" });
      }

      // Create record
      const { error: supabaseError } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) return enqueueSnackbar(supabaseError.message, { variant: "error" });

      form.reset();
      router.refresh();
      enqueueSnackbar("Song created!", { variant: "success" });

      setIsLoading(false);
      onClose?.();
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={handleOnOpenChange}>
      <Modal.Content className="p-0 max-h-full">
        <OverlayScrollbars
          defer
          className="py-4 px-3 xs:py-6 xs:px-6 md:max-h-[95vh]"
          options={{ scrollbars: { autoHide: "leave", autoHideDelay: 1000 } }}
        >
          {title !== null && description !== null && (
            <Modal.Header>
              {title && <Modal.Title className="text-center">{title}</Modal.Title>}
              {description && <Modal.Description className="text-center">{description}</Modal.Description>}
            </Modal.Header>
          )}

          <Form {...form}>
            <form autoComplete="off" className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Field
                control={form.control}
                name="title"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <Input disabled={isLoading} placeholder="Song title" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name="author"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <Input disabled={isLoading} placeholder="Song author" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <div>
                <p className="mb-1">Select a song file</p>
                <Form.Field
                  control={form.control}
                  name="song"
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <Form.Item>
                      <Form.Control>
                        <Input
                          ref={ref}
                          accept=".mp3"
                          disabled={isLoading}
                          name={name}
                          type="file"
                          onBlur={onBlur}
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
              </div>

              <div>
                <p className="mb-1">Select an image</p>
                <Form.Field
                  control={form.control}
                  name="image"
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <Form.Item>
                      <Form.Control>
                        <Input
                          ref={ref}
                          accept="image/*"
                          disabled={isLoading}
                          name={name}
                          type="file"
                          onBlur={onBlur}
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
              </div>

              <Button
                block
                rounded
                className="enabled:hover:scale-[1.02]"
                disabled={!form.formState.isValid || isLoading}
                type="submit"
                variant="brand"
              >
                {isLoading ? <BeatLoader margin={4} size={14} /> : <span>Create</span>}
              </Button>
            </form>
          </Form>
        </OverlayScrollbars>
      </Modal.Content>
    </Modal>
  );
}
