import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import firebase from "firebase/compat/app";
import { auth as firebaseuiAuth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "~/utils/firebase";

import List from "./List";

import { loader } from "./loader";
export const clientLoader = loader;

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { gameItems } = useLoaderData<typeof loader>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) return () => {};

    let ui: firebaseuiAuth.AuthUI;
    const init = async () => {
      const firebaseui = await import("firebaseui");
      ui = new firebaseui.auth.AuthUI(auth);

      const uiConfig: firebaseui.auth.Config = {
        signInFlow: "popup",
        signInOptions: [
          // eslint-disable-next-line import/no-named-as-default-member
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };

      ui.start("#firebaseui-auth-container", uiConfig);
    };
    init();

    return () => {
      ui?.reset();
    };
  }, [isLoggedIn]);

  const onLogout = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center"></div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  {isLoggedIn ? (
                    <Button colorScheme="blue" onClick={onLogout}>
                      Log Out
                    </Button>
                  ) : (
                    <div id="firebaseui-auth-container"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
          <List items={gameItems} />
        </div>
      </main>
    </div>
  );
}
