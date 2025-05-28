"use client";
import { appStore, SettingsType } from "@/stores/app";
import { useEffect } from "react";

const Settings = ({ settings }: { settings: SettingsType }) => {
  const { setSettings } = appStore();

  // ✅ Only set settings on mount or when `settings` change
  useEffect(() => {
    setSettings(settings);
  }, [settings, setSettings]);

  // No UI needed, so return null
  return null;
};

export default Settings;
