export default socket => store => next => action => {
	console.log('in middleware');
	if (action.meta && action.meta.remote) {
	    socket.emit('action', action);
	}
	return next(action);
}