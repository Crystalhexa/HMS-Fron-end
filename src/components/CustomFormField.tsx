"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  COMBOBOX = "combobox",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  options?: { value: string; label: string }[]; // Add options for combobox
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.COMBOBOX:
      return (
        <FormControl>
          <Combobox
            options={props.options || []}
            selectedValue={field.value}
            onSelect={field.onChange}
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

const Combobox = ({   
  options,   
  selectedValue,   
  onSelect, 
}: {   
  options: { value: string; label: string }[];   
  selectedValue: string;   
  onSelect: (value: string) => void; 
}) => {   
  const [open, setOpen] = React.useState(false);    

  return (     
    <Popover open={open} onOpenChange={setOpen}>       
      <PopoverTrigger asChild>         
        <Button           
          variant="outline"           
          role="combobox"           
          aria-expanded={open}           
          className="w-[200px] justify-between bg-dark-400 border-dark-500 text-white" // Updated background color
        >           
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : "Select an option..."}           
          <ChevronsUpDown className="opacity-50" />         
        </Button>       
      </PopoverTrigger>       
      <PopoverContent className="w-[200px] p-0 bg-dark-400 border-dark-500 text-white"> {/* Updated background color */}
        <Command>           
          <CommandInput placeholder="Search..." className="h-9 bg-dark-300 border-0 text-white" />           
          <CommandList>             
            <CommandEmpty>No options found.</CommandEmpty>             
            <CommandGroup>               
              {options.map((opt) => (                 
                <CommandItem                   
                  key={opt.value}                   
                  value={opt.value}                   
                  onSelect={(currentValue) => {                     
                    onSelect(currentValue === selectedValue ? "" : currentValue);                     
                    setOpen(false);                   
                  }}                 
                  className="bg-dark-400 text-white hover:bg-dark-300" // Updated background color
                >                   
                  {opt.label}                   
                  <Check                     
                    className={cn(
                      "ml-auto opacity-100" // Always visible
                    )}                   
                  />                 
                </CommandItem>               
              ))}             
            </CommandGroup>           
          </CommandList>         
        </Command>       
      </PopoverContent>     
    </Popover>   
  ); 
};
