"use client";

import { useState, useEffect } from "react";
import { Music, musicService, MusicPayload } from "@/services/music.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";

interface AddMusicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  musicToEdit?: Music | null;
  onUpdate?: (id: number, data: Partial<MusicPayload>) => void;
}

export default function AddMuiscModal({
  open,
  onOpenChange,
  musicToEdit = null,
  onUpdate,
}: AddMusicModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<MusicPayload>({
    artist_id: 0,
    title: "",
    album_name: "",
    genre: "rnb",
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (musicToEdit) {
      setForm({
        artist_id: musicToEdit.artist_id,
        title: musicToEdit.title,
        album_name: musicToEdit.album_name,
        genre: musicToEdit.genre,
      });
    } else {
      setForm({
        artist_id: 0,
        title: "",
        album_name: "",
        genre: "rnb",
      });
    }
  }, [musicToEdit, open]);

  const handleChange = <K extends keyof MusicPayload>(
    field: K,
    value: MusicPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (musicToEdit && onUpdate) {
        await musicService.updateMusic(musicToEdit.id, form);
        showToast({ message: "Music Updated", type: "success" });
        onUpdate(musicToEdit.id, form);
      } else {
        await musicService.createMusic(form);
        showToast({ message: "Music Created", type: "success" });
      }

      onOpenChange(false);
    } catch (err: any) {
      showToast({
        message: musicToEdit
          ? "Failed to update music"
          : "Failed to create music",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle>Add New Music</DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label className="mb-3">Title</Label>
            <Input
              placeholder="Music Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Album Name</Label>
            <Input
              placeholder="Album Name"
              value={form.album_name}
              onChange={(e) => handleChange("album_name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Genre</Label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.genre}
              onChange={(e) =>
                handleChange(
                  "genre",
                  e.target.value as
                    | "rnb"
                    | "country"
                    | "classic"
                    | "rock"
                    | "jazz",
                )
              }
            >
              <option value="rnb">R&B</option>
              <option value="country">Country</option>
              <option value="classic">Classic</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
            </select>
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading
              ? musicToEdit
                ? "Updating..."
                : "Creating..."
              : musicToEdit
                ? "Update Music"
                : "Create Music"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
