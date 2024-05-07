import { UnknownAction } from 'redux';
import { EntityStatus } from '../models';

export interface BaseAction extends UnknownAction {
    status: EntityStatus;
}