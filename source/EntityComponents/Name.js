var Name = (function(){
	function Name( parent, params ){
		this.parent = parent;
		this.updated = false;
		this.componentName = "name";

		this.name = params.name;
		this.surname = params.surname;
	};

	Name.prototype.getFullName = function(){
		if( this.surname ){
			return this.name + " " + this.surname;
		};
		return this.name;
	}
	return Name;
}());