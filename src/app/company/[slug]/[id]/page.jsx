import CompanyProfile from '@/components/company/CompanyProfile';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/company/by-cid/${params.id}`, {
      next: { revalidate: 60 }, // or use: cache: 'no-store'
    });
    const data = await res.json();
    const company = data?.data;

    return {
      title: company?.name || 'Company Profile',
      description: company?.shortDescription || 'Company detail page',
    };
  } catch {
    return {
      title: 'Company Profile',
      description: 'Company detail page',
    };
  }
}

export default async function CompanyDetailPage({ params }) {
  const { id } = params;

  let company = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/company/by-cid/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    company = data?.data;
  } catch (error) {
    console.error('Company fetch failed:', error);
  }

  return (
    <LayoutStyle7>
      {company ? (
        <CompanyProfile company={company} />
      ) : (
        <div className="text-center py-20 text-gray-500">Company not found</div>
      )}
    </LayoutStyle7>
  );
}
