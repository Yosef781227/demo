import { useState } from "react";

export default function useGetTiktokData(data: any, isLoading: boolean): any[] {
  //TODO: Err handling
  if (isLoading || !data) {
    return [];
  }
  return data?.getTikTokAccount?.videos ?? [];
}
