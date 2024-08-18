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

      <section className="mx-auto flex max-w-4xl flex-col gap-6 p-8 pb-4" id="accountPage">
        <div className="flex items-center">
          <h1 className="mb-4 line-clamp-1 flex-1 text-[2rem] font-bold leading-none tracking-[-0.04em] text-white">
            Account Settings
          </h1>
        </div>

        <AccountContent />
      </section>
    </main>
  );
}
