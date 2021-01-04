import { growdevers } from "../controllers/GrowdeverController";

export default (request, response, next) => {
    const { id } = request.params;

    const growdever = growdevers.find(growdever => growdever.id === id);

    if (!growdever) {
        return response.status(404).json({ error: "Growdever not found"});
    }

    return next();
}
