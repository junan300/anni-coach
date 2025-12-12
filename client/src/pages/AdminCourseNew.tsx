import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Redirect, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCourseNew() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const createCourseMutation = trpc.courses.create.useMutation();

  const [formData, setFormData] = useState({
    title: "",
    titleEs: "",
    description: "",
    descriptionEs: "",
    paymentType: "onetime" as "onetime" | "subscription",
    priceUsd: "",
    subscriptionPriceMonthly: "",
    subscriptionPriceYearly: "",
    durationWeeks: "",
    thumbnailUrl: "",
    contentUrl: "",
    isPublished: false,
  });

  if (loading) {
    return (
      <Layout>
        {() => (
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
      </Layout>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCourseMutation.mutateAsync({
        title: formData.title,
        titleEs: formData.titleEs,
        description: formData.description,
        descriptionEs: formData.descriptionEs,
        paymentType: formData.paymentType,
        priceUsd: formData.paymentType === "onetime" ? parseInt(formData.priceUsd) * 100 : undefined,
        subscriptionPriceMonthly: formData.paymentType === "subscription" ? parseInt(formData.subscriptionPriceMonthly) * 100 : undefined,
        subscriptionPriceYearly: formData.paymentType === "subscription" ? parseInt(formData.subscriptionPriceYearly) * 100 : undefined,
        durationWeeks: parseInt(formData.durationWeeks),
        thumbnailUrl: formData.thumbnailUrl || undefined,
        contentUrl: formData.contentUrl || undefined,
        isPublished: formData.isPublished ? 1 : 0,
      });

      toast.success("Course created successfully!");
      setLocation("/admin");
    } catch (error: any) {
      toast.error(error.message || "Failed to create course");
    }
  };

  return (
    <Layout>
      {(lang) => (
        <div className="min-h-screen py-20">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">
                  {lang === "en" ? "Create New Course" : "Crear Nuevo Curso"}
                </CardTitle>
                <CardDescription>
                  {lang === "en"
                    ? "Fill in the details to create a new course offering."
                    : "Completa los detalles para crear una nueva oferta de curso."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (English)</Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleEs">Título (Español)</Label>
                      <Input
                        id="titleEs"
                        required
                        value={formData.titleEs}
                        onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (English)</Label>
                      <Textarea
                        id="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descriptionEs">Descripción (Español)</Label>
                      <Textarea
                        id="descriptionEs"
                        required
                        rows={4}
                        value={formData.descriptionEs}
                        onChange={(e) => setFormData({ ...formData, descriptionEs: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Payment Type */}
                  <div className="space-y-2">
                    <Label htmlFor="paymentType">Payment Model</Label>
                    <Select
                      value={formData.paymentType}
                      onValueChange={(value: "onetime" | "subscription") =>
                        setFormData({ ...formData, paymentType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onetime">One-time Purchase</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pricing */}
                  {formData.paymentType === "onetime" ? (
                    <div className="space-y-2">
                      <Label htmlFor="priceUsd">Price (USD)</Label>
                      <Input
                        id="priceUsd"
                        type="number"
                        required
                        placeholder="99"
                        value={formData.priceUsd}
                        onChange={(e) => setFormData({ ...formData, priceUsd: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subscriptionPriceMonthly">Monthly Price (USD)</Label>
                        <Input
                          id="subscriptionPriceMonthly"
                          type="number"
                          required
                          placeholder="29"
                          value={formData.subscriptionPriceMonthly}
                          onChange={(e) =>
                            setFormData({ ...formData, subscriptionPriceMonthly: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subscriptionPriceYearly">Yearly Price (USD)</Label>
                        <Input
                          id="subscriptionPriceYearly"
                          type="number"
                          required
                          placeholder="299"
                          value={formData.subscriptionPriceYearly}
                          onChange={(e) =>
                            setFormData({ ...formData, subscriptionPriceYearly: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="durationWeeks">Duration (weeks)</Label>
                    <Input
                      id="durationWeeks"
                      type="number"
                      required
                      placeholder="8"
                      value={formData.durationWeeks}
                      onChange={(e) => setFormData({ ...formData, durationWeeks: e.target.value })}
                    />
                  </div>

                  {/* URLs */}
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL (optional)</Label>
                    <Input
                      id="thumbnailUrl"
                      type="url"
                      placeholder="https://..."
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contentUrl">Course Content URL</Label>
                    <Input
                      id="contentUrl"
                      type="url"
                      placeholder="https://..."
                      value={formData.contentUrl}
                      onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Link to videos, PDFs, or external platform (e.g., Google Drive, Vimeo)
                    </p>
                  </div>

                  {/* Publish */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                    <Label htmlFor="isPublished">Publish course immediately</Label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" disabled={createCourseMutation.isPending}>
                      {createCourseMutation.isPending
                        ? (lang === "en" ? "Creating..." : "Creando...")
                        : (lang === "en" ? "Create Course" : "Crear Curso")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/admin")}
                    >
                      {lang === "en" ? "Cancel" : "Cancelar"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}
