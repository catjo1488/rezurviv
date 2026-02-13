import { execSync } from "child_process";

export let GIT_VERSION = "";
try {
    GIT_VERSION = execSync("git rev-parse HEAD").toString().trim();
} catch (error) {

}
