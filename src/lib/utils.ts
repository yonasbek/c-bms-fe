import PaymentType from "@/types/payment";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isContractPaid(payments: PaymentType[]) {
  const today = new Date();
  const paymentsDates = payments.map((payment) => new Date(payment.payment_to));
  return paymentsDates.some((paymentDate) => paymentDate <= today);
}
