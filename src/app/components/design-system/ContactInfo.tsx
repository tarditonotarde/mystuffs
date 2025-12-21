interface ContactInfoProps {
  email?: string;
  phone?: string;
  location?: string;
  className?: string;
}

export function ContactInfo({ 
  email = 'tarditox@gmail.com',
  phone = '(+34) 663 830 109',
  location = 'Barcelona | Spain',
  className = ''
}: ContactInfoProps) {
  return (
    <div 
      className={`font-['Instrument_Sans:Regular',sans-serif] font-normal text-[14px] text-black tracking-[-0.42px] space-y-2 ${className}`} 
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p>{email}</p>
      <p>{phone}</p>
      <p>{location}</p>
    </div>
  );
}
