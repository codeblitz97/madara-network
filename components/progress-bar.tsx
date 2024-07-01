"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

export default function TopProgress() {
  return (
    <Suspense>
      <ProgressBar
        shallowRouting
        color="#ff0000"
        height="4px"
        options={{ showSpinner: false }}
      />
    </Suspense>
  );
}
