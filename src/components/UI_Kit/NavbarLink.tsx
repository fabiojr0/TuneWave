import { Icon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function NavbarLink({
  item,
  Icon,
  onClickLink,
}: {
  item: { link: string; item: { title: string } };
  Icon: Icon;
  onClickLink: () => void;
}) {
  return (
    <Link to={item.link} key={item.item.title} onClick={onClickLink} className="group">
      <span className="font-semibold flex gap-2 group-active:text-lightGreen transition-all">
        <Icon size={24} weight="fill" />
        <span className="flex flex-col group w-fit">
          <p className="">{item.item.title}</p>
          <span className="w-0 h-[2px] bg-white group-hover:w-full transition-all group-active:bg-lightGreen" />
        </span>
      </span>
    </Link>
  );
}

export default NavbarLink;
