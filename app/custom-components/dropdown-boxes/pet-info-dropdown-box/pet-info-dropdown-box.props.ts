export interface PetInfoDropdownBoxProps {
    isOpen: boolean;
    handlePress: () => ();
    pets: Array<Object>;
    style?: Object;
}