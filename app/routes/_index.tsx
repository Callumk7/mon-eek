import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Mon-EEK" },
    {
      name: "description",
      content: "When you need to get hold of Monique, there is always Mon-EEK",
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      Content sucks, I know
    </div>
  );
}
