// LAYOUT METADATA
import { metadata as layoutMetadata } from "@/app/layout";
// COMPONENTS
import { PageHeader } from "@/components";
import { AccountContent } from "./components";

export const metadata = {
  title: "Web Player: Music for everyone",
};

export const revalidate = 0;

export default function AccountPage() {
  return (
    <main aria-label={`${layoutMetadata.title.default} - ${metadata.title}`}>
      <PageHeader opacity={1} />

      <section className="flex flex-col gap-6 max-w-4xl mx-auto p-8 pb-4" id="accountPage">
        <div className="flex items-center">
          <h1 className="flex-1 text-white text-[2rem] tracking-[-0.04em] leading-none font-bold line-clamp-1 mb-4">
            Account Settings
          </h1>
        </div>

        <AccountContent />
      </section>
    </main>
  );
}
