import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userProfile, updateProfileData } from "../../api/index";

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Camera, User, Calendar, Mail, Shield } from "lucide-react";
import MainLayout from "@/components/ui/layout/MainLayout";

const UserProfile = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  // Default user data
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Guest",
    profilePicture: "https://github.com/shadcn.png",
    joinedDate: "2025-01-01",
  };

  // Fetch user profile data
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userProfile(userId),
  });

  const user = profileData?.me || {};

  // Handle image preview
  const imageUrl = user.profilePicture
    ? `http://localhost:8000/uploads/${user.profilePicture}`
    : defaultUser.profilePicture;

  const [imagePreview, setImagePreview] = useState(imageUrl);
  const [isUploading, setIsUploading] = useState(false);

  // Form setup
  const form = useForm({
    defaultValues: {
      name: user.name || defaultUser.name,
      profilePicture: null,
    },
  });

  // Reset form when user data loads
  useEffect(() => {
    if (!isLoading && user.name) {
      form.reset({
        name: user.name,
        profilePicture: null,
      });
      setImagePreview(
        user.profilePicture
          ? `http://localhost:8000/uploads/${user.profilePicture}`
          : defaultUser.profilePicture
      );
    }
  }, [isLoading, user, form]);

  // Update profile mutation
  const { mutate } = useMutation({
    mutationFn: (data) => updateProfileData(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      toast.success("Profile updated successfully");
      setIsUploading(false);
    },
    onError: () => {
      toast.error("Failed to update profile");
      setIsUploading(false);
    },
  });

  // Handle file change for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("profilePicture", file);
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }
    mutate(formData);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading profile...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full mx-auto max-w-6xl py-8">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - User Overview */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center pt-2">
              <div className="relative mb-4 group">
                <Avatar className="h-32 w-32 border-4 border-card">
                  <AvatarImage
                    src={imagePreview}
                    alt={`${
                      form.watch("name") || user.name || defaultUser.name
                    }'s profile`}
                  />
                  <AvatarFallback className="text-4xl">
                    {(form.watch("name") || user.name || defaultUser.name)
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload new photo</span>
                </label>

                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <h3 className="text-xl font-semibold mt-2">
                {form.watch("name") || user.name || defaultUser.name}
              </h3>

              <Badge variant="outline" className="mt-1">
                {user.role || defaultUser.role}
              </Badge>

              <Separator className="my-6" />

              <div className="w-full space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {user.email || defaultUser.email}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Joined{" "}
                    {new Date(
                      user.createdAt || defaultUser.joinedDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Edit Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Display Name
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-2">
                    <FormLabel>
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Address
                      </span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        value={user.email || defaultUser.email}
                        disabled
                        className="bg-muted"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        disabled
                      >
                        Change
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Contact administrator to update your email address
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <FormLabel>
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Account Role
                      </span>
                    </FormLabel>
                    <Input
                      value={user.role || defaultUser.role}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" variant="outline" className="mr-2">
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-pink-500 to-blue-500"
                      type="submit"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
