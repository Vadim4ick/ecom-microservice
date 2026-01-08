"use client";

import { useState } from "react";
import { ShippingFormInputs } from "@repo/types";

type PaymentMethod = "card" | "sbol" | "applepay";

const YoukassaPaymentForm = ({
  shippingForm,
  total,
}: {
  shippingForm: ShippingFormInputs;
  total: number;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!selectedMethod) return alert("Выберите способ оплаты");

    setLoading(true);

    try {
      // Отправляем данные на payment-service
      const res = await fetch("http://localhost:8002/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingForm,
          method: selectedMethod,
          total,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Открываем ссылку на страницу оплаты ЮKassa
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert("Ссылка на оплату не получена");
        }
      } else {
        alert(data.message || "Ошибка при создании платежа");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при оплате");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Выберите способ оплаты</h2>

      <div className="methods">
        <button
          className={selectedMethod === "card" ? "selected" : ""}
          onClick={() => setSelectedMethod("card")}
        >
          Банковская карта
        </button>
        <button
          className={selectedMethod === "sbol" ? "selected" : ""}
          onClick={() => setSelectedMethod("sbol")}
        >
          Сбербанк Онлайн
        </button>
        <button
          className={selectedMethod === "applepay" ? "selected" : ""}
          onClick={() => setSelectedMethod("applepay")}
        >
          Apple Pay
        </button>
      </div>

      <button onClick={handlePay} disabled={loading}>
        {loading ? "Подготовка к оплате..." : "Оплатить"}
      </button>

      <style jsx>{`
        .methods button {
          margin-right: 10px;
          padding: 10px 20px;
          cursor: pointer;
        }
        .methods button.selected {
          background-color: #4caf50;
          color: white;
        }
        button[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export { YoukassaPaymentForm };
