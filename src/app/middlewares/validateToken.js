import { growdevers } from "../controllers/GrowdeverController";

export default (request, response, next) => {
    const { token } = request.params;

    const growdever = growdevers.find(growdever => growdever.token === token);

    if (!growdever) {
        return response.status(404).json({ error: 'Token is incorrect' });
    }

    return next();
}
