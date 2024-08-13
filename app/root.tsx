import { Outlet, Scripts } from "@remix-run/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./tailwind.css";

export function HydrateFallback() {
  return (
    <>
      <p>Loading...</p>
      <Scripts />
    </>
  );
}

export default function App() {
  return (
    <>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>

      <Scripts />
    </>
  );
}
