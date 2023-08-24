import type { Metadata } from 'next';

const title = 'About | nextjs-starter';

export const metadata: Metadata = {
  title: title,
};

export interface PuasaSunahData {
  success: boolean;
  message: string;
  code: number;
  data: Daum[];
}

export interface Daum {
  id: number;
  category_id: number;
  type_id: number;
  date: string;
  year: number;
  month: number;
  day: number;
  category: Category;
  type: Type;
}

export interface Category {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
  description: string;
}

async function getPuasaSunnah(): Promise<PuasaSunahData[]> {
  const res = await fetch('https://api.puasa-sunnah.granitebps.com/api/v1/fastings');
  const puasaSunnah: PuasaSunahData[] = await res.json();
  return puasaSunnah;
}

export default async function PuasaSunnah() {
  const puasaSunnah = await getPuasaSunnah();
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Puasa Sunnah</h1>
      <ul>
        {puasaSunnah.data.map((puasa) => (
          <li className="ml-5 mt-5" key={puasa.id}>
            <span className="text-xl">{puasa.category.name}</span>
            <br />
            {puasa.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
