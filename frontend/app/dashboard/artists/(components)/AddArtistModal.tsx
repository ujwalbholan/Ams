"use client";

import { useState, useEffect } from "react";
import { Artist, artistService } from "@/services/artist.service";
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

type ArtistForm = {
  name: string;
  dob: string;
  gender: "m" | "f";
  address: string;
  first_release_year: string;
  no_of_albums_released: string;
};

interface AddArtistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artistToEdit?: Artist | null;
  onUpdate?: (id: number, data: Partial<ArtistForm>) => void;
}

export default function AddArtistModal({
  open,
  onOpenChange,
  artistToEdit = null,
  onUpdate,
}: AddArtistModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ArtistForm>({
    name: "",
    dob: "",
    gender: "m",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (artistToEdit) {
      setForm({
        name: artistToEdit.name,
        dob: artistToEdit.dob,
        gender: artistToEdit.gender,
        address: artistToEdit.address,
        first_release_year: String(artistToEdit.first_release_year),
        no_of_albums_released: String(artistToEdit.no_of_albums_released),
      });
    } else {
      setForm({
        name: "",
        dob: "",
        gender: "m",
        address: "",
        first_release_year: "",
        no_of_albums_released: "",
      });
    }
  }, [artistToEdit, open]);

  const handleChange = <K extends keyof ArtistForm>(
    field: K,
    value: ArtistForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (artistToEdit && onUpdate) {
        await artistService.updateArtist(artistToEdit.id, {
          name: form.name,
          dob: form.dob,
          gender: form.gender,
          address: form.address,
          first_release_year: Number(form.first_release_year),
          no_of_albums_released: Number(form.no_of_albums_released),
        });
        showToast({ message: "Artist Updated", type: "success" });
        onUpdate(artistToEdit.id, form);
      } else {
        await artistService.createArtist({
          name: form.name,
          dob: form.dob,
          gender: form.gender,
          address: form.address,
          first_release_year: Number(form.first_release_year),
          no_of_albums_released: Number(form.no_of_albums_released),
        });
        showToast({ message: "Artist Created", type: "success" });
      }

      onOpenChange(false);
    } catch (err: any) {
      showToast({
        message: artistToEdit
          ? "Failed to update artist"
          : "Failed to create artist",
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
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label className="mb-3">Name</Label>
            <Input
              placeholder="Artist Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Date of Debue</Label>
            <Input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Gender</Label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.gender}
              onChange={(e) =>
                handleChange("gender", e.target.value as "m" | "f")
              }
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Address</Label>
            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">First Release Year</Label>
            <Input
              type="number"
              placeholder="2008"
              value={form.first_release_year}
              onChange={(e) =>
                handleChange("first_release_year", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-3">Number of Albums Released</Label>
            <Input
              type="number"
              placeholder="20"
              value={form.no_of_albums_released}
              onChange={(e) =>
                handleChange("no_of_albums_released", e.target.value)
              }
            />
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading
              ? artistToEdit
                ? "Updating..."
                : "Creating..."
              : artistToEdit
                ? "Update Artist"
                : "Create Artist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
