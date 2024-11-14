import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';
import { fetchRedmineIssues } from './src/redmine';

config();

console.log(await fetchRedmineIssues());
