import PlatformLogo from "./PlatformLogo";

type Platform = {
  id: number;
  alternative_name: string;
  category: number;
  created_at: number;
  name: string;
  platform_logo: number | Partial<PlatformLogo>;
  slug: string;
  updated_at: number;
  url: string;
  versions: number[];
  websites: number[];
  checksum: string;
};

export default Platform;
