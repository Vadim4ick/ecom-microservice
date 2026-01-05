import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();

  const token = await getToken();

  const resProduct = await fetch("http://localhost:8000/test", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataProduct = await resProduct.json();

  console.log("token", token);
  console.log(dataProduct);

  const resOrder = await fetch("http://localhost:8001/test", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataOrder = await resOrder.json();

  console.log(dataOrder);

  const resPayment = await fetch("http://localhost:8002/test", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataPayment = await resPayment.json();

  console.log(dataPayment);

  return <div>page</div>;
};

export default TestPage;
