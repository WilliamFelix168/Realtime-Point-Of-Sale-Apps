import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {type === "textarea" ? (
            <Textarea
              {...field}
              id={field.name}
              placeholder={placeholder}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="resize-none"
            />
          ) : (
            <Input
              {...field}
              id={field.name}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
            />
          )}
          {fieldState.error && (
            <FieldError className="text-xs" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
