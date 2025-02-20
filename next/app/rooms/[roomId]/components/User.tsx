import Image from 'next/image';
import Link from 'next/link';

const User = ({
  user,
}: {
  user: { id: string; imageUrl: string; fullName: string };
}) => {
  if (!user) return null;
  return (
    <Link href={`/profile/${user.id}`} className="py-2 ">
      <div>
        <Image
          width={40}
          height={40}
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-4"
          src={user.imageUrl || ''}
          alt=""
        />
        <span className="text-sm">{user.fullName}</span>
      </div>
    </Link>
  );
};

export default User;
