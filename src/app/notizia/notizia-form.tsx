"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNews } from "./actions";
import RoundedInput from "@/components/rounded-input";

const formSchema = z.object({
  firstName: z.string().min(1, "Inserisci il nome"),
  lastName: z.string().min(1, "Inserisci il congnome"),
  fullAddress: z.string().min(1, "Inserisci l'indirizzo"),
  phone: z.string().min(1, "Inserisci il numero di telefono"),
});

export default function NotiziaForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fullAddress: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createNews(values);

    if (result.status !== "error") {
      router.push("/success");
    } else {
      form.setError("root", { message: result.message });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col gap-9 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RoundedInput placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RoundedInput placeholder="Cognome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RoundedInput placeholder="Indirizzo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RoundedInput placeholder="N° di telefono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="min-h-[24px]" />
        <FormMessage
          {...(form.formState.errors.root && {
            children: form.formState.errors.root.message,
          })}
        />
        <div className="min-h-[24px]" />
        <Button
          className="bg-[#01377C] rounded-full py-[22px] px-13"
          type="submit"
          style={{
            boxShadow:
              "0px 4px 4px 0px #00000040, 0px -6px 4px 0px #00000040 inset",
          }}
        >
          <p className="text-[20px]/[20px]">Crea notizia</p>
        </Button>
      </form>
    </Form>
  );
}
