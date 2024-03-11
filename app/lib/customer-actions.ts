'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function deleteCustomer(id:string) {
    try{
      await sql`DELETE FROM customers WHERE id = ${id}`;
      revalidatePath("/dashboard/customers");
      return {message: "Delete Customer."};
    }
    catch (error){
      return {message: "Database Error: Failed to Delete Customer."};
    }
  }
  
  const CustomerFormSchema = z.object({
      id:z.string(),
      name: z.string({
          invalid_type_error: "Please enter a name."
      }),
      email: z.string({
          invalid_type_error: "Please enter an email."
      }).email({
          message: "Email is incorrect."
      }),
      image_url:z.string()
  });
  export type CustomerState = {
      errors?: {
          name?: string[],
          email?: string[];
          image_url?: string[];
      };
      message?: string | null
  }
  
  const CreateCustomer = CustomerFormSchema.omit({ id: true });
  
  export async function createCustomer(prevState:CustomerState, formData: FormData) {
      const validateFields = CreateCustomer.safeParse({
          name: formData.get("name"),
          email: formData.get("email"),
          image_url: formData.get("image_url")
      });
  
      if(!validateFields.success){
          return{
              errors: validateFields.error.flatten().fieldErrors,
              message: "Missing Fields. Failed to Create Customer."
          };
      }
  
      const {name, email, image_url} = validateFields.data;
      try{
          await sql`INSERT INTO customers(name, email, image_url)
          VALUES(${name}, ${email}, ${image_url})`;
      }
      catch(error){
          return{
              message: "Database Error: Failed to Create Customer."
          }
      }
  
      revalidatePath("/dashboard/customers");
      redirect("/dashboard/customers");
  }
  
  const UpdateCustomer = CustomerFormSchema.omit({id:true});
  
  export async function updateCustomer(id:string, prevState:CustomerState, formData: FormData) {
      const validateFields = UpdateCustomer.safeParse({
          name: formData.get("name"),
          email: formData.get("email"),
          image_url: formData.get("image_url")
      });
  
      if(!validateFields.success){
          return {
              errors: validateFields.error.flatten().fieldErrors,
              message: "Missing Fields. Failed to Update Customer."
          }
      }
  
      const {name, email, image_url} = validateFields.data;
  
      try{
          await sql`
              UPDATE customers
              SET name=${name}, email=${email}, image_url=${image_url}
              WHERE id=${id}
          `;
      }
      catch(error){
          return {
              message: "Database Error: Failed to Update Customer."
          }
      }
  
      revalidatePath("/dashboard/customers");
      redirect("/dashboard/customers");
  }