"use client";
import { Loader2, Mail } from "lucide-react";
import { Navigation } from "../components/nav";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Digite seu nome.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Digite seu email.",
    })
    .email("Digite um email válido."),
  message: z.string().min(1, {
    message: "Digite sua mensagem.",
  }),
});

export default function Example() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, message } = values;
    const formData = new FormData();
    formData.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_ID!, name);
    formData.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_ID!, email);
    formData.append(process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_ID!, message);
    setLoading(true);
    return fetch(process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL!, {
      method: "post",
      body: formData,
    })
      .catch(() => {})
      .finally(() => {
        form.reset();
        setLoading(false);
        toast({
          title: "Mensagem enviada!",
          variant: "success",
        });
      });
  }

  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 min-h-screen">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl flex gap-4 items-center">
            <span className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
              <Mail size={20} />
            </span>
            Contacto
          </h2>
          <p className="mt-4 text-zinc-400">
            Entre em contato para descobrir como posso ajudar.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-8 w-full max-w-2xl mx-auto lg:mx-0"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite sua mensagem"
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2 flex justify-end">
                <Button
                  type="submit"
                  className="w-full sm:w-48"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Enviando" : "Enviar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
