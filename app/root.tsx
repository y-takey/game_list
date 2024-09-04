import { Links, Outlet, Scripts } from "@remix-run/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./tailwind.css";

export function HydrateFallback() {
  return (
    <>
      <p>Loading...</p>
      <Links />
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

      <Links />
      <Scripts />
    </>
  );
}
