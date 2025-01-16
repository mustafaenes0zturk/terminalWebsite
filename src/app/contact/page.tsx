"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
    
    setIsSubmitting(false);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-start min-h-[60vh] pt-0 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-xl font-bold mb-6 text-center text-white">İletişim</h1>
          <p className="text-gray-400 mb-6 text-center">
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300">
                İsim
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full bg-[#1C1C1C] rounded px-3 py-2 text-sm focus:outline-none opacity-75"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-300">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full bg-[#1C1C1C] rounded px-3 py-2 text-sm focus:outline-none opacity-75"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-gray-300">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                required
                className="mt-1 block w-full bg-[#1C1C1C] rounded px-3 py-2 text-sm focus:outline-none opacity-75"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-300">
                Mesaj
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="mt-1 block w-full bg-[#1C1C1C] rounded px-3 py-2 text-sm focus:outline-none opacity-75"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 text-sm bg-[#1C1C1C] rounded opacity-75 hover:opacity-100"
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center">Mesajınız başarıyla gönderildi!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>
            )}
          </form>
        </div>
      </div>
    </PageLayout>
  );
} 