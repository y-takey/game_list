import { useState, useEffect } from "react";
import { Button, Flex, Spacer, Box, HStack } from "@chakra-ui/react";
import { Outlet, Link } from "@remix-run/react";
import firebase from "firebase/compat/app";
import { auth as firebaseuiAuth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "~/utils/firebase";
import { ItemsProvider } from "~/contexts/ItemsContext";

import ConditionRadioButton from "./ConditionRadioButton";
import SorterRadioButton from "./SorterRadioButton";
import List from "./List";

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let ui: firebaseuiAuth.AuthUI;
    const init = async () => {
      const firebaseui = await import("firebaseui");
      ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

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
  }, []);

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
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                {isLoggedIn && (
                  <Button colorScheme="blue" onClick={onLogout}>
                    Log Out
                  </Button>
                )}
                <div style={{ display: isLoggedIn ? "none" : "block" }}>
                  <div id="firebaseui-auth-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isLoggedIn ? (
        <ItemsProvider>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Flex>
                <Box>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Games</h1>
                </Box>
                <Spacer />
                <Box>
                  <HStack>
                    <ConditionRadioButton />
                    <SorterRadioButton />
                    <Link to={`new`}>
                      <Button colorScheme="blue">Add</Button>
                    </Link>
                  </HStack>
                </Box>
              </Flex>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
              <List />
            </div>
          </main>
        </ItemsProvider>
      ) : (
        <></>
      )}
    </div>
  );
}
