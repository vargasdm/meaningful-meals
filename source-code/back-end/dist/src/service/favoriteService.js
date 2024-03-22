"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function default_1(favoriteDb) {
    function validateInputFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            // check if favorite exists
            const favorite = yield favoriteDb.getFavoriteByUserAndContent(input);
            if (favorite) {
                errors.push("FAVORITE ALREADY EXISTS");
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
<<<<<<< HEAD
    function validateGetFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    function validateUpdateFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            // check if content is real
            const favorite = yield favoriteDb.getFavoritesByUserId(input.user_id);
            if (!favorite.length) {
                errors.push("FAVORITE DOES NOT EXISTS");
            }
            let isUsers = true;
            favorite.forEach((item) => {
                // check if user owns the favorite
                if (item.content_id == input.content_id) {
                    isUsers = false;
                }
            });
            if (isUsers) {
                errors.push("FAVORITE DOES NOT EXISTS");
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
    function validateId(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input) {
                errors.push("INPUT IS NULL");
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
    function createFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield favoriteDb.createFavorite({
                    favorite_id: (0, uuid_1.v4)(),
                    user_id: input.user_id,
                    content_id: input.content_id,
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    function deleteFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield favoriteDb.getFavoritesByUserId(input.user_id);
                let favoriteId;
                data.forEach((item) => {
                    if (item.content_id === input.content_id) {
                        favoriteId = item.favorite_id;
                    }
                });
                yield favoriteDb.deleteFavorite(favoriteId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getUserFavorites(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield favoriteDb.getFavoritesByUserId(input);
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getContentFavorites(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield favoriteDb.getFavorites();
                let data = [];
                result.forEach((item) => {
                    if (item.content_id === input) {
                        data.push(item);
                    }
                });
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getUserContentFavorite(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield favoriteDb.getFavoriteByUserAndContent(input);
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    return {
        validateInputFavorite,
        validateUpdateFavorite,
        validateId,
        createFavorite,
        deleteFavorite,
        getUserFavorites,
        getContentFavorites,
        getUserContentFavorite,
<<<<<<< HEAD
        validateGetFavorite
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    };
}
exports.default = default_1;
