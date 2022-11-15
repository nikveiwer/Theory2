export const inc = () => {
	return {
		type: "INC"
	}
}

export const dec = () => {
	return {
		type: "DEC"
	}
}

export const rnd = (value) => {
	return {
		type: "RND",
		payload: value
	}
}