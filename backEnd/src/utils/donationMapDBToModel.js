const mapDBToModel = ({
  id,
  title,
  author,
  synopsis,
  donation_image_path,
}) => ({
  id,
  title,
  author,
  synopsis,
  donationCoverPath: donation_image_path,
});
