export default function useQueryParams(location) {
	return new URLSearchParams(location.search);
}