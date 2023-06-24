import { useState } from "react";

export default function useGetTiktokData(data: any, isLoading: boolean): any[] {
  //TODO: Err handling
  if (isLoading) {
    return [];
  }
  return data?.getTikTokAccount?.videos ?? [];
}
