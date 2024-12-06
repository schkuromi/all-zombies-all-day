import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPreSptLoadMod, IPostDBLoadMod
{
    private modConfig = require("../config/config.json")

    public preSptLoad(container: DependencyContainer): void
    {
        //get logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        // get the config server so we can get a config with it
        const configServer = container.resolve<ConfigServer>("ConfigServer");

        // Request seasonal event config
        const seasonConfig: ISeasonalEventConfig = configServer.getConfig<ISeasonalEventConfig>(ConfigTypes.SEASONAL_EVENT);

        if (!this.modConfig.enabled) 
        {
            // log that mod is loaded, but is not enabled in the config
            if (this.modConfig.debug)
            {
                logger.logWithColor("[DEBUG] [SCHKRM] (PreSpt) All Zombies All Day loaded, but mod is disabled in the config.", LogTextColor.BLUE, LogBackgroundColor.YELLOW);
            }
            else
            {
                logger.logWithColor("[SCHKRM] All Zombies All Day loaded, but mod is disabled in the config.", LogTextColor.BLACK, LogBackgroundColor.YELLOW);
            }
            return;
        }

        // hello cj
        // change the seasonal event config
        for (const event of Object.values(seasonConfig.events))
        {
            // coutresy mattdokn & jehree
            // checks if the event is halloween
            if (event.name == "halloween") 
            {
                // double ensures that halloween is enabled
                event.enabled = true;

                // sets start and end for the days and months
                event.startDay = this.modConfig.time.startDay;
                event.startMonth = this.modConfig.time.startMonth;
                event.endDay = this.modConfig.time.endDay;
                event.endMonth = this.modConfig.time.endMonth;

                if (this.modConfig.debug)
                {
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                    logger.logWithColor("[DEBUG] [SCHKRM] Time and Date Settings", LogTextColor.BLUE, LogBackgroundColor.YELLOW)
                    logger.log(`Start Time: Month ${event.startMonth} on Day ${event.startDay}`, LogTextColor.YELLOW)
                    logger.log(`End Time: Month ${event.endMonth} on Day ${event.endDay}`, LogTextColor.YELLOW)
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                }

                // bot hostility settings
                event.settings.replaceBotHostility = this.modConfig.replaceBotHostility
                if (this.modConfig.debug)
                {
                    logger.logWithColor(`[DEBUG] [SCHKRM] Replace Bot Hostility is ${event.settings.replaceBotHostility}`, LogTextColor.BLUE, LogBackgroundColor.YELLOW)
                }

                // thanks shibdib
                // sets internal infection amount for each map to the config value
                event.settings.zombieSettings.mapInfectionAmount.laboratory = this.modConfig.maps.Labs;
                logger.logWithColor(`[SCHKRM] Labs is now ${event.settings.zombieSettings.mapInfectionAmount.laboratory}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.bigmap = this.modConfig.maps.Customs;
                logger.logWithColor(`[SCHKRM] Customs is now ${event.settings.zombieSettings.mapInfectionAmount.bigmap}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                // factory is split into two different maps, so we have to set it once for each map + an extra one just in case
                event.settings.zombieSettings.mapInfectionAmount.factory4 = this.modConfig.maps.Factory;
                event.settings.zombieSettings.mapInfectionAmount.factory4_day = this.modConfig.maps.Factory;
                event.settings.zombieSettings.mapInfectionAmount.factory4_night = this.modConfig.maps.Factory;
                logger.logWithColor(`[SCHKRM] Factory is now ${event.settings.zombieSettings.mapInfectionAmount.factory4}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.interchange = this.modConfig.maps.Interchange;
                logger.logWithColor(`[SCHKRM] Interchange is now ${event.settings.zombieSettings.mapInfectionAmount.interchange}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.lighthouse = this.modConfig.maps.Lighthouse;
                logger.logWithColor(`[SCHKRM] Lighthouse is now ${event.settings.zombieSettings.mapInfectionAmount.lighthouse}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.rezervbase = this.modConfig.maps.Reserve;
                logger.logWithColor(`[SCHKRM] Reserve is now ${event.settings.zombieSettings.mapInfectionAmount.rezervbase}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                // do it twice for ground zero because BSG code is broken, capitalized one is for map visual, while the other two are the ones that actually affect the spawning
                event.settings.zombieSettings.mapInfectionAmount.Sandbox = this.modConfig.maps.GroundZero;
                event.settings.zombieSettings.mapInfectionAmount.sandbox = this.modConfig.maps.GroundZero;
                event.settings.zombieSettings.mapInfectionAmount.sandbox_high = this.modConfig.maps.GroundZero;
                logger.logWithColor(`[SCHKRM] Ground Zero is now ${event.settings.zombieSettings.mapInfectionAmount.sandbox}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.shoreline = this.modConfig.maps.Shoreline;
                logger.logWithColor(`[SCHKRM] Shoreline is now ${event.settings.zombieSettings.mapInfectionAmount.shoreline}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.tarkovstreets = this.modConfig.maps.StreetsOfTarkov;
                logger.logWithColor(`[SCHKRM] Streets of Tarkov is now ${event.settings.zombieSettings.mapInfectionAmount.tarkovstreets}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)

                event.settings.zombieSettings.mapInfectionAmount.woods = this.modConfig.maps.Woods;
                logger.logWithColor(`[SCHKRM] Woods is now ${event.settings.zombieSettings.mapInfectionAmount.woods}% infected`, LogTextColor.BLACK, LogBackgroundColor.YELLOW)
                
                // debug line to preview the mapInfectionAmount settings
                if (this.modConfig.debug)
                {
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                    logger.logWithColor("[DEBUG] [SCHKRM] Map Infection Amount", LogTextColor.BLUE, LogBackgroundColor.YELLOW)
                    console.log(event.settings.zombieSettings.mapInfectionAmount)
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                }
                
                // disable bosses per map, which is actually both PMCs and bosses
                if (!this.modConfig.disablebosses.Labs) // labs is in the array by default, so instead if it's false, we remove it
                {
                    event.settings.zombieSettings.disableBosses.shift()
                }
                if (this.modConfig.disablebosses.Customs)
                {
                    event.settings.zombieSettings.disableBosses.push("bigmap")
                }

                if (this.modConfig.disablebosses.Factory) // factory is two different maps, because bsg is good at planning
                {
                    event.settings.zombieSettings.disableBosses.push("factory4_day")
                    event.settings.zombieSettings.disableBosses.push("factory4_night")
                }

                if (this.modConfig.disablebosses.Interchange)
                {
                    event.settings.zombieSettings.disableBosses.push("interchange")
                }
                        
                if (this.modConfig.disablebosses.Lighthouse)
                {
                    event.settings.zombieSettings.disableBosses.push("lighthouse")
                }
                        
                if (this.modConfig.disablebosses.Reserve)
                {
                    event.settings.zombieSettings.disableBosses.push("rezervbase")
                }
                        
                if (this.modConfig.disablebosses.GroundZero) // ground zero has two, < level 21 and > level 21
                {
                    event.settings.zombieSettings.disableBosses.push("sandbox")
                    event.settings.zombieSettings.disableBosses.push("sandbox_high")
                }
                        
                if (this.modConfig.disablebosses.Shoreline)
                {
                    event.settings.zombieSettings.disableBosses.push("shoreline")
                }
                        
                if (this.modConfig.disablebosses.StreetsOfTarkov)
                {
                    event.settings.zombieSettings.disableBosses.push("tarkovstreets")
                }
                        
                if (this.modConfig.disablebosses.Woods)
                {
                    event.settings.zombieSettings.disableBosses.push("woods")
                }
                
                // debug line to preview the disableBosses array 
                if (this.modConfig.debug)
                {
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                    logger.logWithColor("[DEBUG] [SCHKRM] Disable Bosses Settings", LogTextColor.BLUE, LogBackgroundColor.YELLOW)
                    console.log(event.settings.zombieSettings.disableBosses)
                    logger.log("--------------------------------------", LogTextColor.YELLOW)
                }
            }
            else // if it's not the halloween event, we disable it
            {
                event.enabled = false;
            }
        }
    }

    public postDBLoad(container: DependencyContainer): void
    {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        if (!this.modConfig.enabled) 
        {
            // log that mod is loaded, but is not enabled in the config
            if (this.modConfig.debug)
            {
                logger.logWithColor("[DEBUG] [SCHKRM] (PostDB) All Zombies All Day loaded, but mod is disabled in the config.", LogTextColor.BLUE, LogBackgroundColor.YELLOW);
            }
            return;
        }

        // get database from the server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();

        // sets the visual infection rate number for each map on the map screen
        tables.globals.LocationInfection.laboratory = this.modConfig.maps.Labs;
        tables.globals.LocationInfection.bigmap = this.modConfig.maps.Customs;
        tables.globals.LocationInfection.factory4 = this.modConfig.maps.Factory;
        tables.globals.LocationInfection.Interchange = this.modConfig.maps.Interchange;
        tables.globals.LocationInfection.Lighthouse = this.modConfig.maps.Lighthouse;
        tables.globals.LocationInfection.RezervBase = this.modConfig.maps.Reserve;
        // we skip Ground Zero because BSG is bad at consistency, it's being set above instead
        // tables.globals.LocationInfection.Sandbox = this.modConfig.maps.GroundZero;
        tables.globals.LocationInfection.Shoreline = this.modConfig.maps.Shoreline;
        tables.globals.LocationInfection.TarkovStreets = this.modConfig.maps.StreetsOfTarkov;
        tables.globals.LocationInfection.Woods = this.modConfig.maps.Woods;      

        if (this.modConfig.debug)
        {
            logger.log("--------------------------------------", LogTextColor.YELLOW)
            logger.logWithColor("[DEBUG] [SCHKRM] Location Infection Visual Number (Sandbox is always 0)", LogTextColor.BLUE, LogBackgroundColor.YELLOW)
            console.log(tables.globals.LocationInfection)
            logger.log("--------------------------------------", LogTextColor.YELLOW)
        }

        // send the log message that the mod is fully loaded
        logger.logWithColor("[SCHKRM] The zombies are coming...", LogTextColor.BLACK, LogBackgroundColor.YELLOW);
    }

}

export const mod = new Mod();