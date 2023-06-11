import './advertiser.css';

const Advertiser = (props: { creator: Contact }) => {
  return (
    <section className="advertiser">
      <h2 className="advertiser__title">Advertiser</h2>
      {'email' in props.creator ? (
        <span className="advertiser__email">{props.creator.email}</span>
      ) : (
        <></>
      )}
      {'phoneNumber' in props.creator ? (
        <span className="advertiser__phone">{props.creator?.phoneNumber}</span>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Advertiser;
